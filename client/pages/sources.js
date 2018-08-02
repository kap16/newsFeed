import React from 'react';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';
const fetch = require("node-fetch");

import * as actions from '../actions/index';
import EditSource from '../components/modal/editSource';
import Navbar from '../components/navbar';
import SourceItem from '../components/list/sourceItem';
const config = require('../../config');

class Sources extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sources: []
        };

        this.renderSources = this.renderSources.bind(this);
    }

    componentDidMount(){
        var url = config.server.url+"/sources";
        fetch(url,{
            method: "GET",
            headers: {
                "Authorization": sessionStorage.getItem(config.sessionId),
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then(function(output){
            this.setState({ sources: output.sources });
        }.bind(this))
        .catch(function(e){ console.log(e);}); 
    }

    componentWillUnmount(){

    }
    
    renderSources(){
        var sources = this.state.sources;
        if(sources.length > 0){
            return (
                <div>
                    <table id="sources" className="table table-striped">
                        <thead>
                            <tr>
                                <th>Source</th>
                                <th>Added on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sources.map((source, i)=>( 
                                <SourceItem key={i} source={source}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }else{
            return( 
                <p className="no-result">There are no sources</p>
            );
        }
    }

    render(){
        return( 
            <div>
                <Navbar/>
                <div>
                    {this.state.sources === undefined ? <p>Loading</p> : this.renderSources() }
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

export default connect(mapStateToProps, mapDispatchToProps)(Sources);

