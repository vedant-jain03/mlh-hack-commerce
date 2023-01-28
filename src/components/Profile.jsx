import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div style={{"display":"flex", "alignItems":"center","justifyContent":"center"}} className="profileright">
            <h2 style={{"fontSize":"14px", "marginRight":"1rem"}}>{user.name}</h2>
                <img style={{"width":"3rem", "height":"3rem", "borderRadius":"50%", "marginRight":"1rem"}} src={user.picture} alt={user.name} />
                
            </div>
        )
    );
};

export default Profile;