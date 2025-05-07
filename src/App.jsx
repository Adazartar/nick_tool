import { useState, useEffect } from 'react'
import './App.css'

function App() {
  	const cards = [
		["Fern",5,0,0,0,"plant"],
		["Oak Tree",8,0,0,0,"plant"],
		["Grass Patch",6,0,0,0,"plant"],
		["Deer",0,2,4,0,"herbivore"],
		["Rabbit",0,1,1,0,"herbivore"],
		["Forest Hare",0,2,2,0,"herbivore"],
		["Wolf",0,0,0,6,"carnivore"],
		["Lion",0,0,0,9,"carnivore"],
		["Fox",0,0,0,2,"carnivore"],
		["Eagle",0,0,0,2,"carnivore"]
  	];

	const json_cards = convertToJSON(cards);

  	const [current_cards, setCurrentCards] = useState([]);
	const [search, setSearch] = useState('');
	const [filteredCards, setFilteredCards] = useState(json_cards);
	const [excessLeaf, setExcessLeaf] = useState(0);
	const [excessMeat, setExcessMeat] = useState(0);

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearch(query);
		setFilteredCards(
		  	json_cards.filter(card =>
				card.name.toLowerCase().includes(query)
		  	)
		);
	};
	
	const handleSelect = (card) => {
		setCurrentCards([...current_cards, card]);
		setSearch('');
	};
	
	const handleDeselect = (card) => {
		setCurrentCards(current_cards.filter(c => c !== card));
	}

	const calculateLeaf = () => {
		let total_cons = 0;
		let total_prod = 0;
		
		current_cards.forEach(card => {
			total_cons += card.leaf_cons;
			total_prod += card.leaf_prod;
		});

		return total_prod - total_cons;
	}

	const calculateMeat = () => {
		let total_cons = 0;
		let total_prod = 0;
		
		current_cards.forEach(card => {
			total_cons += card.meat_cons;
			total_prod += card.meat_prod;
		});

		return total_prod - total_cons;
	}

	useEffect(() => {
		const leaf = calculateLeaf();
		const meat = calculateMeat();
		setExcessLeaf(leaf);
		setExcessMeat(meat);
	}, [current_cards]);
	
	

  	return (
	<>
      	<div>
			<label>Search for card: </label>
			<input
			type="text"
			className="search-input"
			value={search}
			onChange={handleSearch}
			placeholder="Type a name..."
			/>
      	</div>

		{search && (
        	<div className="search-dropdown">
				{filteredCards.map((card, i) => {
			  		return (
						<div key={i} className="dropdown-item" onClick={() => handleSelect(card)}>
				  			{card.name}
						</div>
			  		);
				})}
		  	</div>
        )}
	  	<div>Plants:</div>
		<div className="card-box">
  		{current_cards
    		.filter(card => card.type === "plant") // Filter only plants
    		.map((card, i) => (
      			<div key={i} onClick={() => handleDeselect(card)} className="card">{card.name} ({card.type})</div>
    		))}
		</div>
	  	<div>Herbivores: </div>
		<div className="card-box">
  		{current_cards
    		.filter(card => card.type === "herbivore") // Filter only plants
    		.map((card, i) => (
      			<div key={i} onClick={() => handleDeselect(card)} className="card">{card.name} ({card.type})</div>
    		))}
		</div>
	  	<div>Carnivores: </div>
		<div className="card-box">
  		{current_cards
    		.filter(card => card.type === "carnivore") // Filter only plants
    		.map((card, i) => (
      			<div key={i} onClick={() => handleDeselect(card)} className="card">{card.name} ({card.type})</div>
    		))}
		</div>

		<div>Excess Leaf: {excessLeaf}</div>
		<div>Excess Meat: {excessMeat}</div>
    </>
  	)
}



function convertToJSON(cards){
	const json_cards = []
	cards.forEach(card => {
		json_cards.push({
			"name": card[0],
			"leaf_prod": card[1],
			"leaf_cons": card[2],
			"meat_prod": card[3],
			"meat_cons": card[4],
			"type": card[5]
		});
	});

	return json_cards;
}

export default App
