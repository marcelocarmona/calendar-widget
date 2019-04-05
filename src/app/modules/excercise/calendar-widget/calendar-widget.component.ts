import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

function Graph() {
  this.clusters = [];
  this.nodes = {};
}

function Cluster() {
  this.nodes = {};
  this.width = 0;
  this.maxCliqueSize = 1;
}

function Node(id: number, start: number, end: number) {
  this.id = id;
  this.start = start;
  this.end = end;
  this.neighbours = {};
  this.cluster = null;
  this.position = null;
  this.biggestCliqueSize = 1;
}

/**
 * A day starts at 9:00am and ends at 9pm
 * The minimum start is 0 and the maximum end is 720
 *
 * @example
 *  Event: 9:30am - 10:30am
 *  {id: 1, start: 30, end: 90}
 */
interface CalendarEvent {
  id: number;
  start: number;
  end: number;
}

interface HoursLabel {
  hour: string;
  period: string;
}

export interface EventsWithPosition {
  id: number;
  top: number;
  left: number;
  height: number;
  width: number;
}

const MAX_MINUTE = 720;
const MAX_WIDTH = 580;

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar-widget.template.html',
  styleUrls: ['./calendar-widget.style.scss']
})
export class CalendarWidgetComponent implements OnInit {
  JSON = JSON;
  hoursLabels: HoursLabel[] = this.createHourLabes();
  @Input() events: CalendarEvent[] = [
    { id: 0, start: 30, end: 150 },
    { id: 1, start: 540, end: 600 },
    { id: 2, start: 560, end: 620 },
    { id: 3, start: 610, end: 670 }
  ];
  @ViewChild('eventContainer') eventContainer: ElementRef;

  /**
   * Temporal event only used by the form to create events
   */
  tempEvent = {
    start: 100,
    end: 250
  };

  eventsWithPosition: EventsWithPosition[];

  ngOnInit() {
    this.eventsWithPosition = [];
    const distributionGrid = this.createDistributionGrid(this.events);

    const graph = this.createGraph(this.events, distributionGrid);
    this.setClusterWidth(graph);
    this.setNodesPosition(graph);

    Object.keys(graph.nodes).forEach(nodeId => {
      const node = graph.nodes[nodeId];
      const event = {
        id: node.id,
        top: node.start,
        left: node.position * node.cluster.width,
        height: node.end + 1 - node.start,
        width: node.cluster.width
      };

      this.eventsWithPosition.push(event);
    });
  }

  /**
   * The length of the distributionGrid will be 720 (MAX_MINUTE), each index represent a minute,
   * each minute is an Array and this contains the events for that minute
   *
   * 0: []
   * 1: []
   * ...
   * 28: []
   * 29: []
   * 30: [0]
   * 31: [0]
   * 32: [0]
   * ...
   * 98: [0]
   * 99: [0]
   * [100 … 699]
   * 600: [2]
   * 601: [2]
   * ...
   * 610: [2, 3]
   * 611: [2, 3]
   * 612: [2, 3]
   * ...
   * [700 … 719]
   */
  private createDistributionGrid(events: CalendarEvent[]): number[][] {
    // initialize
    const minutes = new Array(MAX_MINUTE);
    for (let i = 0; i < minutes.length; i++) {
      minutes[i] = [];
    }

    // which events occurs at each minute
    events.forEach(event => {
      for (let i = event.start; i <= event.end - 1; i++) {
        minutes[i].push(event.id);
      }
    });

    return minutes;
  }

  /**
   * The graph contains nodes, neighbours, clusters and the biggest clique of the cluster
   *
   * example
   * clusters: Array(2)
   * 0: Cluster {nodes: {…}, width: 0, maxCliqueSize: 1}
   * 1: Cluster {nodes: {…}, width: 0, maxCliqueSize: 1}
   * nodes: Array(4)
   * 0: Node {id: 0, start: 30, end: 149, neighbours: {…}, cluster: Cluster, …}
   * 1: Node {id: 1, start: 540, end: 599, neighbours: {…}, cluster: Cluster, …}
   * 2: Node {id: 2, start: 560, end: 619, neighbours: {…}, cluster: Cluster, …}
   * 3: Node {id: 3, start: 610, end: 669, neighbours: {…}, cluster: Cluster, …}
   *
   * @param events calendar events
   * @param minutes is the distributionGrid
   */
  private createGraph(events: CalendarEvent[], minutes: number[][]) {
    const graph = new Graph();
    const nodeMap = {};

    // creating the nodes
    events.forEach(event => {
      const node = new Node(event.id, event.start, event.end - 1);
      nodeMap[node.id] = node;
    });

    // creating the clusters
    let cluster = null;

    // cluster is a group of nodes which have a connectivity path, when the minute array length is 0 it means that
    // there are n more nodes in the cluster - cluster can be "closed".
    minutes.forEach(minute => {
      if (minute.length > 0) {
        cluster = cluster || new Cluster();
        minute.forEach(eventId => {
          if (!cluster.nodes[eventId]) {
            cluster.nodes[eventId] = nodeMap[eventId];

            nodeMap[eventId].cluster = cluster;
          }
        });
      } else {
        if (cluster != null) {
          graph.clusters.push(cluster);
        }

        cluster = null;
      }
    });

    if (cluster != null) {
      graph.clusters.push(cluster);
    }

    // adding neighbours to nodes, neighbours is the group of colliding nodes (events).
    // adding the biggest clique for each site
    minutes.forEach(minute => {
      minute.forEach(eventId => {
        const sourceNode = nodeMap[eventId];

        // a max clique is a biggest group of colliding events
        sourceNode.biggestCliqueSize = Math.max(
          sourceNode.biggestCliqueSize,
          minute.length
        );
        minute.forEach(targetEventId => {
          if (eventId !== targetEventId) {
            sourceNode.neighbours[targetEventId] = nodeMap[targetEventId];
          }
        });
      });
    });

    graph.nodes = nodeMap;

    return graph;
  }

  /**
   * Calculate the width of each cluster
   */
  private setClusterWidth(graph) {
    graph.clusters.forEach(cluster => {
      // cluster must have at least one node
      let maxCliqueSize = 1;
      Object.keys(cluster.nodes).forEach(nodeId => {
        maxCliqueSize = Math.max(
          maxCliqueSize,
          cluster.nodes[nodeId].biggestCliqueSize
        );
      });

      cluster.maxCliqueSize = maxCliqueSize;
      cluster.width = MAX_WIDTH / maxCliqueSize;
    });
  }

  /**
   * Nodes have to share the X axis with its neighbours
   */
  private setNodesPosition(graph) {
    graph.clusters.forEach(cluster => {
      Object.keys(cluster.nodes).forEach(nodeId => {
        const node = cluster.nodes[nodeId];
        const positionArray = new Array(node.cluster.maxCliqueSize);

        // find a place (offset) on the X axis of the node
        Object.keys(node.neighbours).forEach(neighbourId => {
          const neighbour = node.neighbours[neighbourId];
          if (neighbour.position != null) {
            positionArray[neighbour.position] = true;
          }
        });

        for (let i = 0; i < positionArray.length; i++) {
          if (!positionArray[i]) {
            node.position = i;
            break;
          }
        }
      });
    });
  }

  /**
   * This function create an array of HoursLabel like this
   *
   * 0: {hour: "9:00", period: "AM"}
   * 1: {hour: "9:30", period: "AM"}
   * 2: {hour: "10:00", period: "AM"}
   * 3: {hour: "10:30", period: "AM"}
   * ...
   * 22: {hour: "8:00", period: "PM"}
   * 23: {hour: "8:30", period: "PM"}
   * 24: {hour: "9:00", period: "PM"}
   *
   *  To be honest at first I thought it would be a good idea to create this function,
   *  but the truth is that it is very complicated to keep.
   *  The solution could have been just to create the markup in a simpler way
   */
  private createHourLabes(): HoursLabel[] {
    return Array.from(new Array(25), (val, index) => ({
      hour:
        ((Math.floor(8 + (index * 30) / 60) % 12) + 1).toString() +
        ':' +
        ((index * 30) % 60 < 10 ? `0${(index * 30) % 60}` : (index * 30) % 60),
      period: index < 8 ? 'AM' : 'PM'
    }));
  }

  /**
   * Create a new event
   */
  addEvent(event: MouseEvent) {
    const lastId = this.events.length;
    // create a event clicking the event container
    if (event) {
      const rect = this.eventContainer.nativeElement.getBoundingClientRect();
      const start = event.clientY - rect.top; // y position within the element.
      const end = start + 100;
      if (start >= 0 && end < MAX_MINUTE) {
        this.events.push({
          id: lastId,
          start,
          end
        });
      }
    } else {
      // create a event with the form
      const { start, end } = this.tempEvent;
      if (start >= 0 && end < MAX_MINUTE && end > start) {
        this.events.push({ id: lastId, start, end });
      }
    }

    this.ngOnInit();
  }

  /**
   * Delete the last event
   */
  deleteLastEvent() {
    this.events.pop();
    this.ngOnInit();
  }
}
