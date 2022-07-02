import cn from 'classnames';
import { BurgerIngredientType } from '../../utils/types/burger-ingredient';

import ingredientPreview from './ingredient-preview.module.css';

export interface IngredientPreviewPropsType {
  ingredient?: BurgerIngredientType;
  lastCount?: number;
}

export const IngredientPreview = ({
  ingredient,
  lastCount,
}: IngredientPreviewPropsType) => {

  return (
    <li className={ingredientPreview.container} >
      <div className={ingredientPreview.background} />
      <img
        className={cn(ingredientPreview.image, lastCount && ingredientPreview.image_overlay)}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      {lastCount && (
        <span className={cn(ingredientPreview.countNext, 'text text_type_main-default')}>
          +{lastCount}
        </span>
      )}
    </li>
  );
};
