# ERL Take Home Excercise - Frontend

### Goal

Create a  calendar widget with a simple API for rendering calendar events

### Before you start

The purpose of this challenge is to give us a sense of your skills. When assessing coding challenges, we consider a number of different metrics:

Does the application meet specifications? 	

Is the code organized and intelligible?	

Does the code suggest an awareness of best practices? (modularity, time/space complexity, etc)		

Please keep these questions in mind as you work through the prompt.

## **Environment Setup**


    1. Make sure you have the latest Node.js installed on your machine
 
    2. Install Packages
        - npm install

## **Development server**

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
	
	Routing information

    1. /readme => instructions for this coding excercise
 
    2. /excercise => place to do your work

## Instructions

Create a calendar widget that can render a list of events on a single day (9:00am - 9:00pm), similar to Google Calendar. 

Each event is represented by an object with a start and end attribute. The value of these attributes is the number of minutes since 9am.
	
	Event (9:30am - 10:30am): {start: 30, end: 90}

There are several properties of the layout:

1. No events may visually overlap.
2. If two events collide in time, they must have the same width.
3. An event should utilize the maximum width available, but rule #2 takes precedence over this rule.

The events should be rendered in a container that is:

1. 580px wide
2. 10px padding on the left/right
3. 700px high.

The styling of the events should match the image below:

![Alt text](/src/assets/calendar.png?raw=true "Design")

You may structure your code however you like, but you must implement the following class which takes in an array of events as @Input and will lay out the events according to the above description.

	class CalendarWidget Component {
		@Input() events: CalendarEvent[];
	}

Please use the following times as input for your calendar widget

	[
    	{start: 30, end: 150}, 
    	{start: 540, end: 600}, 
    	{start: 560, end: 620}, 
    	{start: 610, end: 670} 
	]

### Please do your work in the app/modules/excercise/root/excercise.root.component
	
	routing definition in: app/modules/excercise/excercise.routing.ts
	http://localhost:4200//excercise will route to excercise.root.component

Make sure that the following is possible

1. excercise.root.component template should render a CalendarWidget

2. CalendarWidget can accept the expected input events and display them to specification

3. BONUS: A user is able to input an array of valid events and click a button to have the calendar widget render the new events

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
