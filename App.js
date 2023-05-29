import React, { Component } from 'react';
import './App.css';

import AddIndianFoodItem from './AddIndianFoodItem'
import IndianFoodItem from './IndianFoodItem'

const indianFoods = [
  {
    name: 'Adobo',
    price: 500
  },
  {
    name: 'Sinigang',
    price: 800
  },
  {
    name: 'Kare-Kare',
    price: 700
  },
  {
    name: 'Liempo',
    price: 150
  },
  {
    name: 'Nilagang',
    price: 60
  },
  {
    name: 'Sisig',
    price: 150
  },
  {
    name: 'Letchon Kawali',
    price: 350
  },
  {
    name: 'Taba ng talangka',
    price: 350
  },
  {
    name: 'Crispy Pata',
    price: 550
  },
  {
    name: 'Bopis',
    price: 300
  }
];

localStorage.setItem('indianFoods', JSON.stringify(indianFoods));

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      indianFoods: JSON.parse(localStorage.getItem('indianFoods'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentWillMount(){
    const indianFoods = this.getIndianFoods();
    this.setState({ indianFoods })
  }

  getIndianFoods() {
    return this.state.indianFoods;
  }

  onAdd(name, price) {
    //console.log(name, price)
    const indianFoods = this.getIndianFoods();
    indianFoods.push({
      name,
      price
    });

    this.setState({ indianFoods })
  }

  onDelete(name){
    const indianFoods = this.getIndianFoods();

    const filteredIndianFoods = indianFoods.filter(indianFood => {
      return indianFood.name !== name;
    });

    this.setState({ indianFoods: filteredIndianFoods })
  }

  onEditSubmit(name, price, originalName){
    let indianFoods = this.getIndianFoods();

    indianFoods = indianFoods.map(indianFood => {
      if(indianFood.name === originalName){
        indianFood.name = name;
        indianFood.price = price;
      }

      return indianFood;

    });

    this.setState({ indianFoods })
    //console.log(name, price)
  }

  render() {
    return (
      <div className="App">
        <h1>FILIPINO FOOD ITEM CRUD</h1>

        <AddIndianFoodItem
          onAdd={this.onAdd}

        />
          {
            this.state.indianFoods.map(indianFood => {
              return (
                <IndianFoodItem
                  key={indianFood.name}
                  {...indianFood}
                  onDelete={this.onDelete}
                  onEditSubmit={this.onEditSubmit}
              />
            );
          })
          }
      </div>
    );
  }
}

export default App;
