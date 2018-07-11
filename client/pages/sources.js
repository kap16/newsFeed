// Importing Libraries
import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';
const fetch = require("node-fetch");

// Importing files
import * as actions from '../actions/index';
const config = require('../../config.json');
import Navbar from '../components/navbar';
import SourceItem from '../components/list/sourceItem';

class Sources extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sources: []
        };

        this.renderSources = this.renderSources.bind(this);
        this.showEditSourceModal = this.showEditSourceModal.bind(this);
    }

    componentDidMount(){
        var url = config.api+"/sources";
        fetch(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then(function(output){
            console.log("output",output)
            console.log(url === output.url)
            this.setState({ sources: output.sources });
            
        })
        .catch(function(e){ console.log(e);}); 
        console.log("after fetch");
    }
    
    renderSources(){
        var sources = this.state.sources;
        console.log("renderSources",this.state);
        if(sources.length > 0){
            return (
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
            );
        }else{
            return( 
                <p className="no-result">There are no sources</p>
            );
        }
    }

    showEditSourceModal(){
        this.setState({
            ...this.state,
            modalActive: !this.state.modalActive,
            modal: (this.state.modalActive ? "" : "Edit Source") 
        });
    }

    render(){
        return( 
            <div>
                <Navbar/>
                {
                    this.state.modalActive && this.state.modal==="Edit Source"?
                    <EditSource
                        onClose={this.showEditSourceModal} 
                        show={this.state.modalActive}/>
                    :null
                }
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

export default connect(null, mapDispatchToProps)(Sources);

