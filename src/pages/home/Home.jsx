import Navbar from "../../components/navbar/Navbar.jsx"
import Header from "../../components/header/Header.jsx"
import Featured from "../../components/featured/Featured.jsx"
import PropertyList from "../../components/propertyList/PropertyList.jsx"

import "./Home.css"

const Home = () => {
	return (
		<div>
			<Navbar/>
			<Header/>
			<div className="homeContainer">
				<Featured/>
				<h1 className="homeTitle">Browse by property type</h1>
				<PropertyList/>
			</div>
		</div>
	);
};

export default Home