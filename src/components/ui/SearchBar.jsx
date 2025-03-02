import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
    const getFilteredItems = (query, items) =>{
        if(!query) {
            return items;
        }
        return items.filter(course => course.name.includes(query))
    }

    let items = [] // THIS IS WHAT THE SEARCH BAR SEARCHES THROUGH

    const filteredItems = getFilteredItems(query, items);

    return (
        <>
        <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <ul>
        {filteredItems.map(value => <h1 key={value.name}>{value.name}</h1> )}
      </ul>
      </>
    );
  };
  


  const styles = {
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 0',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '2px solid #ccc',
      borderRadius: '4px',
      marginRight: '10px',
      width: '300px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };


export default SearchBar