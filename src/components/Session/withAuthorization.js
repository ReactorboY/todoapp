import React from 'react'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import {withFirebase} from '../firebase'
import * as ROUTES from '../constants/routes'

const withAuthorization = condition =>  Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listerner = this.props.firebase.auth.onAuthStateChanged(authUser => {
                if(!condition(authUser)) {
                    this.props.history.push(ROUTES.SIGNIN)
                }
            })
        }

        componentWillUnmount() {
            this.listerner()
        }

        render() {
            return <Component {...this.props} />
        }
    }

    return compose(
        withRouter,
        withFirebase
    )(WithAuthorization)
}

export default withAuthorization