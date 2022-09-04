import { useToasts } from 'react-toast-notifications';
import { iProduct } from '../../../models/product.interface';
import styles from '../../../styles/components/common/card/card.module.scss';
import handleAddToCart from '../../../utils/addToCart';
import { Fade, FiShoppingCart, Image, Link, Rating } from '../../../utils/commonImports';
import HoverIcons from './HoverIcons';

type iProps = {
    product: iProduct;
    index: number;
    setQuickViewDetails: any;
    setModalOpen: any;
};

export default function Card({ product, index, setQuickViewDetails, setModalOpen }: iProps) {
    const { addToast } = useToasts();

    return (
        <Fade className={styles.singleProduct} cascade>
            <div>
                {product?.onSale && <span className={styles?.onSale}>On Sale</span>}
                <div className={styles.image}>
                    <HoverIcons
                        index={index}
                        setQuickViewDetails={setQuickViewDetails}
                        setModalOpen={setModalOpen}
                    />
                    <Image
                        src={product?.images[0]}
                        width={220}
                        height={224}
                        placeholder="blur"
                        blurDataURL="/images/loading-min.jpg"
                    />
                </div>
                <small className={styles.category}>{product?.category}</small>
                <Link passHref href={`/product-details/${product._id}`}>
                    <h3 className={styles.title}>{product?.title}</h3>
                </Link>
                <div className={styles.ratingDiv}>
                    <Rating name="read-only" value={5} precision={0.1} readOnly />
                    <span className={styles.reviewsNumber}>(32)</span>
                </div>
                <p>
                    By <span>MBeBazar</span>
                </p>
                <div className={styles.bottom}>
                    <h2>${product?.offerPrice}</h2>
                    <del>${product?.price}</del>

                    <button
                        onClick={() => {
                            handleAddToCart(product);
                            addToast('Product added to cart', {
                                appearance: 'success',
                                autoDismiss: true,
                                autoDismissTimeout: 2000,
                            });
                        }}
                        type="button"
                        className={styles.button}
                    >
                        <FiShoppingCart /> Add
                    </button>
                </div>
            </div>
        </Fade>
    );
}
