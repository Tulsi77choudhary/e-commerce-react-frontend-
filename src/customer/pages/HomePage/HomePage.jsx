import React from "react";
import MainCrousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/mens_kurta";
import { mensShoes } from "../../../Data/mensShoes";
import { womensSaree } from "../../../Data/womensSaree";

const HomePage = () => {
  return (
    <div>
      <MainCrousel />
      <div className='space-y-10 py-10 flex- flex-col items-center px-5 lg:px-10'>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"}/>
        <HomeSectionCarousel data={mensShoes} sectionName={"Men's Shoes"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Shirt"}/>   
        <HomeSectionCarousel data={womensSaree} sectionName={"Women's Saree"}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Women's Dress"}/>
      </div>
    </div>
  );
}
export default HomePage;