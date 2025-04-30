// src/components/DailyForecast.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard } from 'swiper/modules';
import EffectMaterial from '../assets/scripts/effect-material.esm.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/styles/effect-material.css';
import { toTitleCase } from '../services/formattingService.js';

const DailyForecast = ({ daily }) => {
  const daysToDisplay = daily.slice(1, 8); // Skip today, show next 7 days
  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="max-w-xl">
      <h2 className="mb-5">7 Day Forecast</h2>
      <Swiper
        className="w-full h-48"
        modules={[Pagination, EffectMaterial, Keyboard]}
        keyboard={{ enabled: true}}
        effect="material"
        materialEffect={{
          slideSplitRatio: 0.65,
        }}
        spaceBetween={10}
        slidesPerView={2}
        pagination={{ clickable: true }}
      >
        {daysToDisplay.map((day, index) => {
          const date = new Date(day.dt * 1000)
          const dayName = weekdayNames[date.getDay()];
          const icon = day.weather[0].icon;

          return (
            <SwiperSlide key={index}>
              <div className="swiper-material-wrapper">
                <div className="swiper-material-content cursor-pointer flex flex-col px-5">
                  <p className="font-bold">{dayName}</p>
                  <img 
                    src={`https://openweathermap.org/img/wn/${icon}.png`}
                    data-swiper-material-scale="1.25"
                    alt={day.weather[0].description} 
                  />
                  <p><strong>High:</strong> {Math.round(day.temp.max)}°F</p>
                  <p><strong>Low:</strong> {Math.round(day.temp.min)}°F</p>
                  <p>{toTitleCase(day.weather[0].description)}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DailyForecast;