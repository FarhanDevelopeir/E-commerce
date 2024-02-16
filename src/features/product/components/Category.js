import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { namecategory } from '../../../Redux/features/counter/ProductSlice';
import electronic from '../../../Images/electronic.jpg';
import jewelry from '../../../Images/jewelry.jpg';
import menclothing from '../../../Images/womenclothing.jpg';
import womenclothing from '../../../Images/menclo.jpg';
import { Link } from 'react-router-dom';
import { allCategoriesAsync, allFetchedCategories, selectCategory } from '../productSlice';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const Namecategory = useSelector((state) => state.product.categoryNames);
    const CategoryPictures = useSelector((state) => state.product.categoryPictures);
    const categories = useSelector(allFetchedCategories);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const categoryPics = [
        electronic,
        jewelry,
        womenclothing,
        menclothing
    ];

    const fetchcategory = async () => {
        try {
            // Fetch data and dispatch the namecategory and imagecategory actions
            const res = await axios.get('https://fakestoreapi.com/products/categories');
            dispatch(namecategory(res.data));


        } catch (error) {
            console.log('Error:', error);
        }
    }


    const handleClick = (name) => {
        console.log(name)
        dispatch(selectCategory(name));
        navigate('/filterproducts');

    }

    useEffect(() => {
        fetchcategory();
        dispatch(allCategoriesAsync())
    }, []);

    if (categories.length > 0) {
        console.log(categories)
    }

    // Render your component based on the data from the Redux store
    const cateNames = categories.map((item, i) => {
        // console.log("items => ", item, i)
        return (


            <div className='hover-shadow w-25 rounded'>
                <div onClick={() => handleClick(item.name)}  >
                    <div key={item} className=' p-1 w-100 rounded   text-center'>

                        <img src={categoryPics[i]} className='cate-img rounded mb-2' alt={item} height="120" />
                        <h6 className='cate-text text-danger'>{item.name}</h6>
                    </div>
                </div>
            </div>



        );
    });

    return (
        <div className='mt-5'>
            <h3>Categories</h3>
            <div className=' rounded d-flex p-1 ' >
                <div className='d-flex justify-content-around w-100'>
                    {cateNames}
                </div>
            </div>
        </div>
    );
}

export default Category;
