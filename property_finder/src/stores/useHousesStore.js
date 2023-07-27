import { defineStore } from 'pinia'
import axios from 'axios'
export const useHousesStore = defineStore('houses', {
  state: () => ({
    houses: [],
    filter: 'Price',
    searchValue: '',
    searchResults: '',
    house: null,
    loading: false,
    error: null
  }),
  getters: {
    randomHouses() {
      const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
      return [this.houses[getRandom(0, this.houses.length)], this.houses[getRandom(0, this.houses.length)], this.houses[getRandom(0, this.houses.length)]];
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
      this.searchResults = searchResults.length;
      return this.filterHouses(searchResults)
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
            "X-Api-Key": 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J',
          }})
        .then((response) => {
          return response.data[0];
        })
        this.house = result;
  
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    deleteHouse(itemID) {
      this.houses = this.houses.filter((object) => {
        return object.id !== itemID
      })
    },
    findHouse(itemID) {
      const house = this.houses.find((obj) => obj.id === itemID)
      return house
    }
  }
})

// export const useHousesStore = defineStore('houses', () => {
//     const houses = ref([]);
//     const filter =  ref("Price");
//     const searchValue = ref("");
//     const house = ref(null);
//     const loading = ref(false);
//     const error = ref(null);

//     async function getHouses() {
//     try {
//       this.loading = true;
//      const result = await axios({
//         method: 'get',
//         url: 'https://api.intern.d-tt.nl/api/houses',
//         headers: {
//           "X-Api-Key": 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J',
//         }})
//       .then((response) => {
//         return response.data;

//       })
//       houses.value = result;
//     } catch (error) {
//       console.log(error)
//     } finally {
//       this.loading = false
//     }
//   }

  

//   const deleteHouse = async (id)  => {
//     this.loading = true
//     try {
//       await axios({
//         method: 'delete',
//         url: `https://api.intern.d-tt.nl/api/houses/${id}`,
//         headers: {
//           "X-Api-Key": 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J',
//         }})

//       this.houses = this.houses.filter((object) => {
//             return object.id !== id;
//           });
//     } catch (error) {
//       console.log(error)
//     } finally {
//       this.loading = false
//     }
//   }

//   const addHouse = async (house)  => {
//     this.loading = true

//     try {
//      await axios({
//         method: 'post',
//         url: `https://api.intern.d-tt.nl/api/houses`,
//         data: {...house},
//         headers: {
//           "X-Api-Key": 'NR3DQitLcfy84se9njdwqkGgAXaFZW0J',
//         }})
//       this.houses = this.houses.push(house);
//     } catch (error) {
//       console.log(error)
//     } finally {
//       this.loading = false
//     }
//   }

//   return {
//     houses,
//     filter,
//     searchValue,
//     house,
//     loading,
//     error,
//     getHouses,
//     getHousesById,
//     deleteHouse,
//     addHouse
//   }
// })
