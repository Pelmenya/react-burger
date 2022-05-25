import { useSelector } from "react-redux";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { Loader } from "../../components/loader/loader";
import { getBurgerIngredientsState } from "../../services/redux/selectors/burger-ingredients";

export const IngredientPage = () => {
	const { loading } = useSelector(getBurgerIngredientsState);
	const isLoading = loading === 'pending'

	return isLoading ? <Loader /> : <IngredientDetails />
};
