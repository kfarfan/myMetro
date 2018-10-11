

const App = ( () => {

    let params = {
        api_key: '787bd84324d743039d7a6d1338c00fb2',
        RouteID: '16A'
    }
    
    var platform = new H.service.Platform({
        'app_id': 'PgfFKWWbq5cIPb02KfcS',
        'app_code': 'ywqn9dpunVgNAUu8x0N8rg'
        });
    
        // Obtain the default map types from the platform object
        var maptypes = platform.createDefaultLayers();
    
        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.querySelector('#root'),
            maptypes.normal.map,
                {
                    zoom: 11.5,
                    center: { lng: -77.0910, lat: 38.8816 }
                })    
                         
                   
    function fetchedData () {
        
        fetch('https://api.wmata.com/Bus.svc/json/jBusPositions?api_key='+params.api_key+'&RouteID='+params.RouteID)
       .then((response) => response.json())
       .then((data) => {
        
           let output = `<h2>Bus Timings</h2>`;
           data.BusPositions.forEach(item => {
               output += 
               `<ul>
                   <li>[${item.TripHeadsign}] ${item.DirectionText}</li>
                   <li>${item.RouteID}</li>
                   <li>${item.DateTime} </li>
               </ul>
        
               `
               var berlinMarker = new H.map.Marker({
                lat: `${item.Lat}`,
                lng:`${item.Lon}`
              });
              map.addObject(berlinMarker);
    
               ;
           })
           
           document.querySelector('#maps').innerHTML = output;
       })
       .catch(err => err)
       
       
       };
       
       const render = _ => {      
           addMap(); 
       }
    
       const addMap = _ => {
        let addMap = setTimeout(fetchedData, 1000); 
        addMap;

       }

       const listeners = _ => {
           document.querySelector('#root').addEventListener('click', function() {
               window.location.reload();
           })
       }

       return {
           render: render,
           listeners: listeners
       }
})();

App.render();
App.listeners();