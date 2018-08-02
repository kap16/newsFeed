// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux';
//const fetch = require("node-fetch");

// Importing files
import * as actions from '../actions/index';
import Navbar from '../components/navbar';
const config = require('../../config');

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {}

        this.renderItems = this.renderItems.bind(this);
    }

    componentDidMount(){
        var url = config.server.url+"/items";
        fetch(url,{
            method: "GET",
            headers: {
                "Authorization": sessionStorage.getItem(config.sessionId),
                "Content-Type": "application/json"
            }
        })
        .then(function(res){ 
            console.log(res)
            return JSON.parse(JSON.stringify(res))
            //return res.json(); 
        })
        .then(function(output){
            console.log(output);
            //this.setState({ items: output.items });
            //console.log(this.state)
        })
        .catch(function(e){ console.log(e);});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    
    renderItems(){
        var items = this.state.items;
        if(items.length > 0){
            return( 
                <div>
                    {items.map((show, i)=>( 
                        <Item key={i} item={item}/>
                    ))}
                </div>  
            );
        }else{
            return( 
                <p style={{padding:"10px"}}>There are no news items available</p>
            );
        }   
    }

    render(){
        console.log(this.props);
        return( 
            <div className="main-body">
                <Navbar/>
                <div className="left-side">
                    <p style={{padding:"10px"}}>Hello</p>
                </div>
                <div className="right-side">
                    {this.state.items === undefined ? <p>Loading</p> : this.renderItems() }
                </div>
            </div>         
        );
    }
}

function mapStateToProps(state) {  
    return { ...state };
}


function mapDispatchToProps(dispatch) {  
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);