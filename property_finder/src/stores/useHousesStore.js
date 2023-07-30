import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/index'

export const useHousesStore = defineStore('houses', {
  state: () => ({
    houses: [],
    filter: 'Price',
    searchValue: '',
    searchResults: '',
    popUpOpen: false,
    house: null,
    loading: false,
    error: null
  }),
  getters: {
    randomHouses() {
      const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
      let random =  [
        this.houses[getRandom(0, this.houses.length-1)],
        this.houses[getRandom(0, this.houses.length-1)],
        this.houses[getRandom(0, this.houses.length-1)]
      ]
      return random
    },
    filterHouses() {
      return (data) =>
        this.filter === 'Price'
          ? data.sort((a, b) => {
              return b.price - a.price
            })
          : data.sort((a, b) => {
              return b.size - a.size
            })
    },
    searchHouses() {
      const searchResults = this.houses.filter((house) =>
        house.location.street.toLowerCase().includes(this.searchValue.toLowerCase())
      )
      this.searchResults = searchResults.length
      return this.filterHouses(searchResults)
    },
    getHouseForEditById() {
      return (id) => {
        const currentHouse = this.houses.find((house) => house.id === parseInt(id))
        this.house = { ...currentHouse }
      }
    }
  },
  actions: {
    async getHouses() {
      this.loading = true
      try {
        const result = await axios({
          method: 'get',
          url: 'https://api.intern.d-tt.nl/api/houses',
          headers: {
            'X-Api-Key': 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J'
          }
        }).then((response) => {
          return response.data
        })
        this.houses = result
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async getHouseById(id) {
      this.loading = true
      try {
        const result = await axios({
          method: 'get',
          url: `https://api.intern.d-tt.nl/api/houses/${parseInt(id)}`,
          headers: {
            'X-Api-Key': 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J'
          }
        }).then((response) => {
          return response.data[0]
        })
        this.house = result
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async createHouse(newListing) {
      this.loading = true
      const fd = new FormData()
      fd.append('image', newListing.image, newListing.image.name)
      // eslint-disable-next-line no-unused-vars
      const { image, ...house } = newListing;
      try {
        const result = await axios({
          method: 'post',
          url: `https://api.intern.d-tt.nl/api/houses`,
          data: { ...house },
          headers: {
            'X-Api-Key': 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J'
          }
        }).then((response) => {
          console.log(response.data, "main")
          return response.data
        })
      await axios({
        method: 'post',
        url: `https://api.intern.d-tt.nl/api/houses/${result.id}/upload`,
        data: fd,
        headers: {
          'X-Api-Key': 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J'
        }
      })
        this.houses.push(result);
        await this.getHouses();
        router.push(`/house/${result.id}`)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async updateHouseById(id, listingUpdate, image) {
      this.loading = true
      const fd = new FormData()
      fd.append('image', image)
      try {
        await axios({
          method: 'post',
          url: `https://api.intern.d-tt.nl/api/houses/${parseInt(id)}`,
          data: { ...listingUpdate },
          headers: {
            'X-Api-Key': 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J'
          }
        })
        await axios({
          method: 'post',
          url: `https://api.intern.d-tt.nl/api/houses/${parseInt(id)}/upload`,
          data: fd,
          headers: {
            'X-Api-Key': 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J'
          }
        })
        this.houses.map(house => {
          if(house.id === parseInt(id)) {
            house.price = listingUpdate.price,
            house.rooms.bedrooms = listingUpdate.bedrooms,
            house.rooms.bathrooms= listingUpdate.bathrooms,
            house.size =  listingUpdate.size,
            house.description= listingUpdate.description,
            house.location.streetName= listingUpdate.streetName,
            house.location.houseNumber= listingUpdate.houseNumber,
            house.location.numberAddition= listingUpdate.numberAddition,
            house.location.zip= listingUpdate.zip,
            house.location.city= listingUpdate.city,
            house.constructionYear= listingUpdate.constructionYear,
            house.hasGarage = listingUpdate.hasGarage
          }
        })

        await this.getHouses();
        router.push(`/house/${parseInt(id)}`)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async deleteHouse(id) {
      try {
        await axios({
          method: 'delete',
          url: `https://api.intern.d-tt.nl/api/houses/${parseInt(id)}`,
          headers: {
            'X-Api-Key': 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J'
          }
        })
        this.houses = this.houses.filter((object) => {
          return object.id !== id
        })
      }catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
     
    }
  }, 
  persist: true,
})