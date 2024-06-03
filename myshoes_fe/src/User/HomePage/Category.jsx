import React from "react";
import { categoryData } from "./categoryData";

const Category = () => {
  return (
    <div className="flex justify-around p-5">
      {categoryData.map((item, index) => (
        <div key={index}>
          <p
            id={`category-heading-${index}`}
            className="font-medium text-gray-900"
          >
            {item.firstCategory}
          </p>
          <ul
            role="list"
            aria-labelledby={`category-heading-${index}`}
            className="mt-6 flex flex-col space-y-6"
          >
            {item.firstContent.map((content, contentIndex) => (
              <li key={contentIndex} className="flow-root">
                <a href="#" className="-m-2 block p-2 text-gray-500">
                  {content}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Category;
