import React from "react";
import MainCrousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/mens_kurta";
import { mens_Shoes } from "../../../Data/mens_Shoes";
import { womens_Saree} from "../../../Data/womens_Saree";
import {mens_shirt} from "../../../Data/mens_shirt"
import { womens_dress } from "../../../Data/womens_dress";

const HomePage = () => {
  return (
    <div>
      <MainCrousel />
      <div className='space-y-10 py-10 flex- flex-col items-center px-5 lg:px-10'>
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"}/>
        <HomeSectionCarousel data={mens_Shoes} sectionName={"Men's Shoes"}/>
        <HomeSectionCarousel data={mens_shirt} sectionName={"Men's Shirt"}/>   
        <HomeSectionCarousel data={womens_Saree} sectionName={"Women's Saree"}/>
        <HomeSectionCarousel data={womens_dress} sectionName={"Women's Dress"}/>
      </div>
    </div>
  );
}
export default HomePage;