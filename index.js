const {parse}=require('csv-parse');
const fs=require('fs');

const habitablePlanets=[];

// If an extrasolar planet is “potentially habitable” 
// First we need to check if it is actually habitable.(disposition property must be confirmed)
//Exoplanet temperature(insolation flux 'koi_insol'), size(==>Planetary Radius 'koi_prad'), star type:.
function isHabitablePlanet(planet){
	return planet['koi_disposition']==='CONFIRMED'
	&&planet['koi_insol']>0.36&&planet['koi_insol']<1.11
	&&planet['koi_prad']<1.6;
}


fs.createReadStream('nasa_data.csv')
.pipe(parse({
	comment:'#',
	columns:true
}))
.on('data',(data)=>{
	if(isHabitablePlanet(data)){
		habitablePlanets.push(data);
	}
})
.on('error',(err)=>{
console.log(err);
})
.on('end',()=>{
	console.log(`${habitablePlanets.length} habitable planets found!`);
	console.log('done');;
})