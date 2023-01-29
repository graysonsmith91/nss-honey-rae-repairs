import { useEffect, useState } from "react"

export const CustomerForm = () => {
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })
    const [feedback, setFeedback] = useState("")

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    
    useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])


    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(res => res.json())
            .then((data) => {
                const customerObject = data[0]
                updateProfile(customerObject)
            })
    },
        [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
    }

    return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>
}