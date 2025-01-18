
function avgRating(ratings){
    if(ratings.length===0) return 0;

    const totalRating=ratings.reduce((acc,curr)=>{
        acc+=curr.rating;
        return acc;
    },0);

    const avg=Math.round((totalRating/ratings.length)*10)/10;
    return avg;
}

export default avgRating;