import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faBed, 
	faPlane, 
	faCar, 
	faTaxi,
	faCalendarDays,
	faPerson,
	faMagnifyingGlass
	 } 
	from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";

const Header = ({type}) => {
	const [destination, setDestination] = useState("");
	const [openDate, setOpenDate] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const [width, setWidth] = useState(0)

	window.addEventListener('mouseup', function(event){
    var headerSearchDiv = document.getElementById('headerSearch');
	    if(window.innerWidth < 830){
	    	if(event.target.className == "dateBackground"
	    	|| event.target.className == "headerContainer"
	    	|| event.target.parentElement.className == "headerListItem" 
	    	|| event.target.parentElement.className == "headerInfo"){
	      headerSearchDiv.style.left = '-1280px';
	      setOpenSearch(false)
	    	}
	  	}
    }
    );  

	const reportWindowSize = () => {
		const widthSize = window.innerWidth;
		setWidth(widthSize);
	}

	window.onresize = reportWindowSize;

	const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  	]); 

	const [openOption, setOpenOption] = useState(false);

	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 1,

	});

	const navigate = useNavigate()

	const handleOption = (name, operation) => {
		setOptions((prev) => {
			return {
				...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
			};
		});
	};

	const handleSearch = () => {
		navigate("/hotels", { state: { destination, date, options } });
	}

	return (
		<div className="header">
			<div className="dateBackground" style={openSearch ? {display: "flex"} : {display: "none"}}></div>
			<div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
				<div className="headerList">
					<div className="headerListItem active">
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
        	<div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
        	</div>
        	<div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
        	</div>
        	<div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
        	</div>
				</div>
				{type !== "list" &&
				<>
				 <div className="headerInfo">
						<h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
						<p className="headerDesc">Get rewarded for your travels - unlock instant 
						savings of 10% or more with a free HotelFinder account
						</p>
						<button className="headerBtn">Sign in / Register</button>
						<div className="headerSearchSmall" style = {window.innerWidth < 830 ? {display: "flex"} : {display: "none"} } onClick={() => setOpenSearch(!openSearch)}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
							<span>Pesquisar Estadias</span>
						</div>
					</div>
					<div id="headerSearch" className="headerSearch" style={window.innerWidth > 830 || window.innerWidth < 830 && openSearch ? {left: "0px"} : {left: "-1280px"}}>
						<div className="headerSearchItem">
							<FontAwesomeIcon icon={faBed} className="headerIcon"/>
							<input 
							type="text"
							placeholder="Where are you going?"
							className="headerSearchInput"
							onChange={(e) => setDestination(e.target.value)}
							/>
						</div>
						<div className="headerSearchItem" >
							<FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
							<span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
							{openDate && 
								<DateRange
							   editableDateInputs={true}
							   onChange={item => setDate([item.selection])}
							   moveRangeOnFirstSelection={false}
							   ranges={date}
							   minDate={new Date()}
							   className='date'
								/>
							}
						</div>
						<div className="headerSearchItem">
							<FontAwesomeIcon icon={faPerson} className="headerIcon"/>
							<span className="headerSearchText" onClick={()=> setOpenOption(!openOption)}>{options.adult} adult • {options.children} children • {options.room} room</span>
							{openOption &&
							<div className="options">
								<div className="optionItem">
									<span className="optionText">Adult</span>
									<div className="optionCounter">
										<button className="optionCounterButton" disabled={options.adult <= 1} onClick={()=>handleOption("adult", "d")}>-</button>
										<span className="optionCounterNumber">{options.adult}</span>
										<button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
									</div>
								</div>
								<div className="optionItem">
									<span className="optionText">Children</span>
									<div className="optionCounter">
										<button className="optionCounterButton" disabled={options.children <= 0} onClick={()=>handleOption("children", "d")}>-</button>
										<span className="optionCounterNumber">{options.children}</span>
										<button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
									</div>
								</div>
								<div className="optionItem">
									<span className="optionText">Room</span>
									<div className="optionCounter">
										<button className="optionCounterButton" disabled={options.room <= 1} onClick={()=>handleOption("room", "d")}>-</button>
										<span className="optionCounterNumber">{options.room}</span>
										<button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
									</div>
								</div>
							</div>
							}
						</div>
						<div className="headerSearchItem">
							<button className="headerBtn" onClick={handleSearch}>Search</button>
						</div>
					</div>
					</>}
			</div>
		</div>
	)
}

export default Header