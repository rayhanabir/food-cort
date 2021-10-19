import React from 'react';

const Header = () => {
    const headerStyle={
        backgroundColor:'gray',
        color:'white',
        textAlign:"center",
        lineHeight:"28px"
    }
    return (
        <div style={headerStyle}>
            <h3>Let's Order Your Favourite Food !</h3>
        </div>
    );
};

export default Header;