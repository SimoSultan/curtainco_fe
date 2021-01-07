import React, { useState, useEffect } from "react"

import Container from "@material-ui/core/Container"

import { useCurtainContext } from "../../config/CurtainCoContext"
import { ACTIONS } from "../../config/stateReducer"
import { registerUser, loginUser } from "../../services/authServices"
import Copyright from "./Copyright"
import { UserDataForm } from "../export"

import { Redirect, useHistory } from "react-router-dom"

export default function SignUp() {
    const history = useHistory()
    const { state, dispatch } = useCurtainContext()
    const [prevUrl, setPrevUrl] = useState("/")

    function handleRegister(userDetails) {
        let registerError = false
        // REGISTER THE USER
        registerUser(userDetails)
            .then((regResp) => {
                if (regResp.status === 201) {
                    console.log("User successfully signed up")
                }
            })
            .then(() => {
                let { email, password } = userDetails
                // AFTER THE USER HAS BEEN CREATED LOG THE USER IN
                loginUser({ email, password })
                    .then((logResp) => {
                        let currentUser = logResp.data.user

                        if (currentUser && logResp.status === 200) {
                            dispatch({
                                type: ACTIONS.LOGIN,
                                payload: currentUser,
                            })
                        } else {
                            registerError = `didn't get the user returned when signing up`
                            console.log(registerError)
                        }
                    })
                    .catch((error) => {
                        registerError = `An error ocurred on login: ${error}.`
                        console.log(registerError)
                    })
            })

            .catch((error) => {
                registerError = `An error ocurred on register: Error Code: ${error.status}. Message: ${error.message}.`
                console.log(registerError)
            })

        return registerError
    }

    // AFTER USER LOGS IN, REDIRECT THEM TO THE PREVIOUS PAGE THEY CAME FROM
    useEffect(() => {
        // THIS prevUrl HAS ALREADY BEEN SPLIT ON THE LOGIN PAGE
        // SO WE JUST NEED TO KNOW WHAT THE VALUE IS
        setPrevUrl(history.location.state.prevUrl)
    }, [history])

    return (
        <>
            {state.loggedIn ? (
                <Redirect to={prevUrl} />
            ) : (
                <>
                    <UserDataForm
                        currentUser={state.currentUser}
                        handleFunctionFromParent={handleRegister}
                        formTitle={"Sign Up"}
                        withAuth={true}
                        buttonText={"Sign Up"}
                        headerInformation={true}
                        withConsultMessage={false}
                    />
                    <Container maxWidth="sm">
                        <Copyright />
                    </Container>
                </>
            )}
        </>
    )
}
