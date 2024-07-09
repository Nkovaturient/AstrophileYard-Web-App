const apiKey= "eWSZdk1SvFmkYayc1ZKlCEBsIRiehzxEO3IGJdDV";
const nasa_id='as11-40-5874';

// const nasaURL=`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`;
const nasaURL=`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

async function getPolyImagingData(){
   try{
      let result=await fetch(nasaURL);
      let data= await result.json();
      // console.log(data2);
      return data;

   } catch(err){
      console.log(`NASA ERROR- ${err}`);
   }
}

// getPolyImagingData();
module.exports= getPolyImagingData;


