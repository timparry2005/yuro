import * as OddsActions from '../../actions/OddsActions';
import React, {Component, PropTypes} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MainSection from '../../components/MainSection';
import {Map as map} from 'immutable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import style from './App.css';

export class App extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
        odds: PropTypes.object.isRequired
    }

    constructor (props, context) {
        super(props, context);
    }

    componentWillReceiveProps (nextProps) {
    // if (nextProps.route.filter !== this.props.filter) {
    //   this.setState({filter: nextProps.route.filter});
    // }
    }

    render () {
        const { actions, odds } = this.props;
        return (
            <div>
                <Header/>
                <MainSection actions={actions} odds={map(odds)}/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    odds: state.odds
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(OddsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
