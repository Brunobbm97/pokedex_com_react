import { Box, Container } from "@mui/system"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'
import { Grid } from "@mui/material"
import { Skeletons } from "../components/Skeletons"

export const Home = () => {
    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        getPokemons();
    }, [])
    const getPokemons = () =>{
        var endpoints =[]
        for(var i=1; i < 50;i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))

        /*axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=50")
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err))*/
    }
    const pokemonFilter = (name) =>{
        var filteredPokemons = []
        if(name === ""){
            getPokemons();
        }
        for(var i in pokemons){
            if(pokemons[i].data.name.includes(name)){
                filteredPokemons.push(pokemons[i])
            }
        }
        setPokemons(filteredPokemons)
    }
    return(
        <div>
            <Navbar pokemonFilter={pokemonFilter}/>
            <Container maxWidth="xg">
                <Grid container spacing={3}>
                    {pokemons.length === 0 ? <Skeletons/> : 
                    pokemons.map((pokemon, key) => 
                    <Grid item xs={12} md={6} sm={4} lg={2} key={key}>
                        <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                    </Grid>
                    )}
                </Grid>  
            </Container>
        </div>
    )
}