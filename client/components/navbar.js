// Importing Libraries
import React from 'react';
import {Link} from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';

// Importing files
import * as actions from '../actions/index';
import Modal from '../components/modal/modal';
import AddSource from '../components/modal/addSource';
import navbarStyle from '../css/default/navbar.css'
const config = require('../../config.json');

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {};

        this.showModal = this.showModal.bind(this);
        this.showAddSourceModal = this.showAddSourceModal.bind(this);
        this.hideModal = this.hideModal.bind(this)
    }

    showModal(){
        /*this.setState({
            ...this.state,
            modalActive: !this.state.modalActive,
            modal: (this.state.modalActive ? "" : "Generic") 
        });*/
    }

    showAddSourceModal(){
        /*this.setState({
            ...this.state,
            modalActive: !this.state.modalActive,
            modal: (this.state.modalActive ? "" : "Add Source") 
        });*/
    }

    hideModal(){
        /*this.setState({
            ...this.state,
            modalActive: !this.state.modalActive,
            modal: (this.state.modalActive ? "" : "Generic") 
        });*/
    }

    render(){
        //console.log(this.props)
        return( 
            <div>
                <header className="clearfix">
                    <div className="container">
                        <div className="header-left">
                            <h1><a href="/">newsFeed</a></h1>
                        </div>
                        <div className="header-right">
                            <label htmlFor="open">
                                <span className="hidden-desktop"></span>
                            </label>
                            <input type="checkbox" name="" id="open"/>
                            <nav>
                                <a href="/sources">Sources</a>
                                <a href="/settings">Settings</a>
                                <a href="#" onClick={this.props.actions.showModal}>Show Modal</a>
                                {
                                    this.props.modal.active && this.props.modal.type===actions.MODAL?
                                    <Modal
                                        onClose={this.props.actions.hideModal} 
                                        show={this.props.modal.active}>
                                        This message is from Modal!
                                    </Modal>
                                    :null
                                }
                                <a href="#" onClick={this.props.actions.showAddSourceModal}>Add Source</a>
                                {
                                    this.props.modal.active && this.props.modal.type===actions.ADD_SOURCE?
                                    <AddSource
                                        onClose={this.props.actions.hideModal} 
                                        show={this.props.modal.active}/>
                                    :null
                                }
                                <a href="#">{"v"+VERSION}</a>
                            </nav>
                        </div>
                    </div>
                </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);