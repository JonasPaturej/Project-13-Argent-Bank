import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

function Profile() {
    const { user, isAuthenticated, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
      
    async function handleUpdateName() {
        const result = await dispatch(updateUserProfile({ firstName, lastName }));

        if (updateUserProfile.fulfilled.match(result)) {
            setIsEditing(false);
        }
    }


    if (error) {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    return (
    <main className="main bg-dark">
        <div className="header">
            {user ? (
                <>
                {!isEditing ? (
                    <>
                        <h1>Welcome back <br /> {user.firstName} {user.lastName}!</h1>
                        <button 
                            className="edit-button"
                            onClick={() => {
                            setFirstName(user.firstName);
                            setLastName(user.lastName);
                            setIsEditing(true)}}>
                            Edit Name
                        </button>
                    </>
                ) : (
                    <>
                        <h1>Edit user info</h1>
                        <div className="edit-name-form">
                            <div className="edit-name-input">
                                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                            </div>
                        </div>
                        <div className="edit-name-buttons">
                            <button className="edit-button" onClick={handleUpdateName}>Save</button>
                            <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </>
                )}
            </>
            ) : (
                <h1>Chargement...</h1>
            )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>                
            </div>
        </section>

        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>                
            </div>
        </section>
        
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>                
            </div>
        </section>
    </main>
    );
}

export default Profile;