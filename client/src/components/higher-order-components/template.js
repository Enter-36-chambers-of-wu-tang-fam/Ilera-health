import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class COMPONENT extends Component {
        render( ) {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { };
    }
    
    return connect(mapStateToProps)(COMPONENT);
}