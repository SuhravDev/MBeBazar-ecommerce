import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { iProduct } from '../../../models/product.interface';
import { addToCart } from '../../../Redux/Slices/cartSlice';
import styles from '../../../styles/components/Home/dealsOfTheDay/dealsOfTheDay.module.scss';
import handleAddToCart from '../../../utils/addToCart';
import {
  Fade,
  FiShoppingCart,
  Image,
  Link,
  Rating,
  SectionHeader,

  // eslint-disable-next-line prettier/prettier
  useState
} from '../../../utils/commonImports';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import Countdown from './Countdown';

export default function DealsOftheDay({ dealsOfTheDay }: { dealsOfTheDay: iProduct[] }) {
  const [products] = useState<iProduct[]>(dealsOfTheDay);
  const dispatch = useDispatch();
  const {addToast} = useToasts();
  return (
    <div className={styles.dealsContainer}>
      <SectionHeader>
        <h1>Deals Of The Day</h1>
        <h3>
          All Deals <IoIosArrowForward className={styles.arrowIcon} />
        </h3>
      </SectionHeader>
      <div className={styles.deals}>
        {products.slice(0, 4).map(p => (
          <Fade className={styles.singleDealFade} triggerOnce direction="left" key={p._id}>
            <div className={styles.singleDeal}>
              <div className={styles.image}>
                <Image src={p.images[0]} layout="fill" placeholder="blur" blurDataURL="/images/dealsOfDay/dealofDay1.png" />
                <Countdown />
              </div>
              <div className={styles.content}>
                <Link href={'/product-details/' + p._id}>
                  <h3>{p.title}</h3>
                </Link>
                <h4>
                  <Rating name="read-only" value={4.5} precision={0.1} readOnly />
                  <p>(32)</p>
                </h4>
                <p>
                  By <span>NestFood</span>
                </p>

                <div className={styles.bottom}>
                  <h2>${p.offerPrice}</h2>
                  <del>${p.price}</del>

                  <PrimaryButton onClick={()=>{
                        const items = handleAddToCart(p, 1);
                        dispatch(addToCart(items));
                        addToast('Item added to cart', {appearance: 'success', autoDismiss: true , autoDismissTimeout: 1500})
                  }} text="Add" icon={<FiShoppingCart />} />
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
