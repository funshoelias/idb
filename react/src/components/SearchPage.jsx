import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/SearchPage.css';
import { Row, Grid, Pagination, Button, Collapse, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import CourseCard from './CourseCard.jsx';
import ReactPaginate from 'react-paginate'
import JobCard from './JobCard.jsx';
import SubjectCard from './SubjectCard.jsx';
import Highlighter from "react-highlight-words";



class SearchPage extends Component{
	constructor(props) {
		super(props);
			var query = props.match.query;
			this.state = {
			value: "",
			query: '',
      		url:'http://api.learning2earn.me/search',
      		display:0,
      		pageSize: 32,
      		page:'1',
      		jobs: [],
      		courses: [],
      		subjects:[]

		};
		this.getSubject = this.getSubject.bind(this)
		this.handleButtonClick = this.handleButtonClick.bind(this)
		this.highlight = this.highlight.bind(this)
	}

	handleButtonClick(newDisplay){
		this.setState({display: newDisplay});
	}
	componentWillMount(){
		this.setState({query: this.props.match.params.query.toLowerCase()})
		const url = this.state.url + "?q=" + this.props.match.params.query.toLowerCase();
		console.log(url)
	    fetch(url)
	      .then((response) => {return response.json()})
	      .then((searchJson) =>{
	        return searchJson
	      })
	      .catch((error) => {console.log(error.message); return []})
	      .then((info) => {this.setState({courses: info.courses, jobs: info.jobs, subjects: info.subjects, maxPageCourses: Math.ceil(info.courses.length / this.state.pageSize), maxPageJobs: Math.ceil(info.jobs.length / this.state.pageSize), maxPageSubjects: Math.ceil(info.subjects.length / this.state.pageSize)})})

	}

	componentWillReceiveProps(nextProps) {
	    if(JSON.stringify(this.props.match.query) !== JSON.stringify(nextProps.match.params.query)) // Check if it's a new user, you can also use some unique, like the ID
		    {
	           this.setState({query: nextProps.match.params.query});
		    }
		const url = this.state.url + "?q=" + nextProps.match.params.query.toLowerCase();
		console.log(url)

	    fetch(url)
	      .then((response) => {return response.json()})
	      .then((searchJson) =>{
	        return searchJson
	      })
	      .catch((error) => {console.log(error.message); return []})
	      .then((info) => {this.setState({courses: info.courses, jobs: info.jobs, subjects: info.subjects, maxPageCourses: Math.ceil(info.courses.length / this.state.pageSize), maxPageJobs: Math.ceil(info.jobs.length / this.state.pageSize), maxPageSubjects: Math.ceil(info.subjects.length / this.state.pageSize)})})

	}
	getSubject(subjectID){
		var subName = async() => {await fetch('http://api.learning2earn.me/subjects?subjectId=' + subjectID)
		.then((response) => {return response.json()})
	      .then((subjectJson) => {
	        return subjectJson[0]
	      })
	      .then((sub) => {return sub})
	      }
	      return subName;
	}
  	highlight(words){
  		return <Highlighter searchWords={[this.state.query]} textToHighlight= {words}/> 
  	}

  render(){
    var {courses, jobs, subjects, maxPageCourses, maxPageJobs, maxPageSubjects} = this.state;
    var list;
    var results;
    //courses
    if(this.state.display == 0){
    	var lastInd = this.state.page * this.state.pageSize
	    var firstInd = lastInd - this.state.pageSize
	    var courseArr = courses.slice(firstInd, lastInd);
    	list = courseArr.map((course,i) =>
				<Row key={i}>
    		
		      	<tr>
		      	<Link to={`/courses/${course.id}`}>
	  				<h3> Course: {this.highlight(course['course'])} </h3>
  				</Link>
	  				<p> Provider: {this.highlight(course['provider'])}</p>
	  				<p> Instructor: {this.highlight(course['instructor'])}</p>
	  				<p> Description: {this.highlight(course['desc'])}</p>
	  				<p> Related Subjects: {this.highlight(this.getSubject(course['subject-id'])) }  </p>
				</tr>
			
		</Row>
	    )
    }
    //subjects
    else if(this.state.display == 1){
    	var lastInd = this.state.page * this.state.pageSize
	    var firstInd = lastInd - this.state.pageSize
	    var subjectsArr = subjects.slice(firstInd, lastInd)
    	list = subjectsArr.map((subject,i) =>
				<Row key={i}>
		      	<tr>
    				<Link to={`/subjects/${subject.id}`}>
	  					<h3> Subject: {this.highlight(subject["subject"])} </h3>
					</Link>

	  				<p> Provider: {this.highlight(subject.provider)} </p>
				</tr>
		</Row>
	    )
    }
    //jobs
    else{
      var lastInd = this.state.page * this.state.pageSize
	    var firstInd = lastInd - this.state.pageSize
	    var jobArr = jobs.slice(firstInd, lastInd)
    	list = jobArr.map((job,i) =>
			<Row key={i}>
		      	<tr>
    				<Link to={`/jobs/${job.id}`}>
	  					<h3>Job: {this.highlight(job.name)} </h3>
					</Link>
	  				<p>Provider: {this.highlight(job.provider)} </p>
	  				<p>Type: {this.highlight(job.jobtype)} </p>
	  				<p>Location: {this.highlight(job.location)} </p>
	  				<p>Description: {this.highlight(job.desc)} </p>
				</tr>
			</Row>
	    )
    }
		if (list.length == 0){
			list = <h1>No Search Results :(</h1>
		}
    return(
		<div>
			<form onSubmit={(e) =>
				{    e.preventDefault();
					window.location.href = '/search/' + this.state.value}}>
			<input placeholder="Search" onChange={(event) => {this.setState({value: event.target.value})}}/>
			</form>
			<br />
			<br />
	    	<button onClick={e => this.handleButtonClick(0)}> Courses </button>
	    	<button onClick={e => this.handleButtonClick(1)}> Subjects </button>
	    	<button onClick={e => this.handleButtonClick(2)}> Jobs </button>
	      	<h2>Search Results: {results}</h2>
	      	<table>
	      		<tbody>
	      			{list}
	      		</tbody>
	      	</table>
      	</div>
    );
  }
}
export default SearchPage
