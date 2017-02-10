import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Results from './Results.jsx';


const styles = {
  button: {
    margin: 12,
  },
  paper:{
    height: 800,
 width: 1000,
 margin: 100,
 textAlign: 'center',
 display: 'inline-block',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 1,
  },
};

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {input:'',completed:0, isSubmit:false,output:[]};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({input:e.target.value});
  }

  handleSubmit(e){
    var that = this;
    this.setState({isSubmit:true});
    request
    .post("http://localhost:3000/results")
    .type('json')
    .send(that.state.input)
    .end(function(err, res){
      that.setState({output:JSON.parse(res)});
      done();
    });
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render(){
    var box=null;
    if(this.state.isSubmit){
      box=<div>
          <Results output={this.state.output}/>
      </div>
    }
    return (<div>
      <TextField
        id="repoUrl" value={this.state.input} onChange={this.handleChange}
        floatingLabelText="Repo URL"
        type="text"
      />
      <RaisedButton
       target="_blank"
       label="Submit"
       secondary={true}
       onClick={this.handleSubmit}
       style={styles.button}
     />
      {box}
    </div>);
  }

}

export default Home;
