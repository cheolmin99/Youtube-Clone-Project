import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';
import Comment from '../components/Comment';

export default function VideoDetail() {
    const { state: { video } } = useLocation();
    const { title, channelId, channelTitle, description } = video.snippet;
    const [showMore, setShowMore] = useState(false);
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    return (
        <section className='flex flex-col lg:flex-row'>
            <article className='basis-4/6'>
                <iframe
                    id="player"
                    type="text/html"
                    width="100%"
                    height="640"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    frameborder="0"
                    title={title}
                />
                <div className='p-8'>
                    <h2 className='text-xl font-bold'>{title}</h2>
                    <ChannelInfo id={channelId} name={channelTitle} />
                    <pre className={`whitespace-pre-wrap bg-stone-800 p-5 pb-7 rounded-2xl ${showMore ? '' : 'line-clamp-4'}`}>
                        {description}
                        {!showMore && <p onClick={handleShowMore} className='cursor-pointer text-blue-500 text-right bg-stone-800'>...더보기</p>}
                        {showMore && <p onClick={handleShowMore} className='cursor-pointer text-blue-500'>간략히</p>}
                    </pre>
                </div>
                <div className='lg:p-8 py-8'>
                    <Comment id={video.id} />
                </div>
            </article>
            <section className='basis-2/6'>
                <RelatedVideos id={video.id} />
            </section>
        </section>
    );
}

