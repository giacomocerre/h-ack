import React from 'react';

interface Widget {
    title: string;
    description: string;
    image: string;
}

interface WidgetListProps {
    data: Widget[];
}

const SuggestList = ({ data }: WidgetListProps) => {

    return (
        <div className='suggestion-main-content'>
            <header>
                <h2 className='suggest-title'>Cosa ci siamo già detti</h2>
            </header>
            <div className='suggest-list-content'>
                {data.map((item, index) => (
                    <div key={index} className="widget-container">
                        <div className="image-container" style={{background: "url("+item.image+")", backgroundSize:"cover", backgroundPosition:"center"}}>
                            {/* <img src={item.image} alt={item.title} className="circular-image" /> */}
                        </div>
                        <div className="text-container">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestList;
