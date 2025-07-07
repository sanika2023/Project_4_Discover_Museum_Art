import React from 'react';

const BanList = ({bannedItems, onUnban}) =>  {
    return (

        <div className = "ban-list">
            <h3>Ban List</h3>
            {bannedItems.length === 0 ? 
            (<p>Nothing banned yet</p>):
            (
                bannedItems.map((item,index)=> (
                    <button key={index} className = "banned-button" onClick={()=>onUnban(item)}>
                        {item}</button>


                ))
            )
            
            
            }



        </div>



    );



}

export default BanList;