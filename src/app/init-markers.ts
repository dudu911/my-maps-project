export class Init{
    load(){
        if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined){
            console.log('No markers, creating new ones'); 

            var markers = [
                       {
                            name:'Jerusalem', 
                            temp: "29",
                            lat: 31.768319, 
                            lng: 35.213710, 
                            isOpen: false
                        },
                         {
                            name:'Tel Aviv', 
                            temp: "32",
                            lat: 32.085300, 
                            lng: 34.781768, 
                            isOpen: false
                        },
                       {
                            name:'Amsterdam', 
                            temp: "-2",
                            lat:52.370216,
                            lng:4.895168, 
                            isOpen: false
                        },
                        {
                            name:'London', 
                            temp: "16",
                            lat: 51.507351, 
                            lng: -0.127758, 
                            isOpen: false
                        },
                      
                        {
                            name:'New York', 
                            temp: "23",
                            lat: 40.783060, 
                            lng: -73.971249, 
                            isOpen: false
                        }, 
                          {
                            name:'Los Angeles', 
                            temp: "23",
                            lat: 34.052234, 
                            lng: -118.243685, 
                            isOpen: false
                        }
                        ];

            localStorage.setItem('markers', JSON.stringify(markers));
       }
       else{
           console.log('loading markers');
       }
    }   
}