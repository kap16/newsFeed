import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/index';
import Navbar from '../components/navbar';
import articleStyle from '../styles/default/article.css';
import { convertDateTime } from '../utils.js';
const config = require('../../config');

class NewsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: this.props.params.id !== null ? this.props.params.id : null
    };

    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    this.props.actions.getItem({itemId: this.state.itemId});
  }

  renderContent(){
    var article = this.props.items;
    if( article === null){
      return(
        <p>This news article doesn't exist</p>
      )
    }else{
      return(
        <div>
          <h2>{article.title}</h2>
          <h3>This was published on {convertDateTime(article.pubDate)}</h3>
          <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="main-body">
        <Navbar/>
        <div id="article">
          {this.state.itemId === undefined ? <p>Loading</p> : this.renderContent()}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);

