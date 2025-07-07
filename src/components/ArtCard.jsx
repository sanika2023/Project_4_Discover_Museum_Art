import React from 'react';

const ArtCard = ({art, onAttributeClick}) =>
{
    if (!art) return null;
    const attributes = [
        art.artistDisplayName,
        art.culture,
        art.department,
        art.medium,
        art.dimensions,
        art.country,
        art.period,
        art.objectName
    ].filter(Boolean);

    return (
    <div className="card">
        <h2>{art.title}</h2>
        <h5>by: {art.artistDisplayName}</h5>
        <div className="attributes">
            {attributes.map((attr, idx) => (
            <button
                key={idx}
                className="attribute-button"
                onClick={() => onAttributeClick(attr)}
            >
                {attr}
            </button>
            ))}
        </div>
        {art.primaryImageSmall && (
            <img
            src={art.primaryImageSmall}
            alt={art.title}
            width="300"
            style={{ marginTop: '1em' }}
            />
        )}
    </div>
);

}

export default ArtCard;