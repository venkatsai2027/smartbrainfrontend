import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn){
		return (
		<nav style = {{display:'flex',justifyContent:'flex-end'}}>
			<p onClick = {() => onRouteChange('signout')}
			className = 'f3 link dim black underline pa3 pointer'> Sign Out </p>
		</nav>
	);
	} else {
		return (
		<nav style = {{display:'flex',justifyContent:'flex-end'}}>
			<p onClick = {() => onRouteChange('signin')} className = 'f3 link dim black underline pa3 pointer'> SignIn </p>
			<p onClick = {() => onRouteChange('signup')} className = 'f3 link dim black underline pa3 pointer'> SignUp </p>
		</nav>
	);
	}
	
}

export default Navigation;