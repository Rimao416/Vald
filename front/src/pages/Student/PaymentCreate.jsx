import { useState } from "react";
import FormGroup from "../../components/form/FormGroup";
import Input from "../../components/form/Input";
import StripeCheckout from "react-stripe-checkout";
import MainLayout from "../../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { updateClassLevel } from "../../redux/slice/classSlice";
import MainButton from "../../components/MainButton";
import { useParams } from "react-router-dom";
import { API } from "../../config";

function PaymentCreate() {
  const { _id } = useParams();
const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.academicSubjectReducer);
  const [montant, setMontant] = useState(0);
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleChange = (e) => {
    setMontant(e.target.value);
    // setData({ ...dataProgram, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        API.withCredentials = true;
        const { token } = JSON.parse(localStorage.getItem("profile"));
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await API.post("/api/v1/academic-payments/create-checkout-session", {
          tokenId: stripeToken.id,
          amount: montant,
        });
        toast.success("Paiment effectué avec success");
        navigate("/payments");
      } catch (error) {
        console.log(error);
      }

      //     const res = await userRequest.post("/checkout/payment", {
      //       tokenId: stripeToken.id,
      //       amount: 500,
      //     });
      //     // history.push("/success", {
      //     //   stripeData: res.data,
      //     //   products: cart, });
    };
    stripeToken && makeRequest();
  }, [stripeToken, montant, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(
    //   updateClassLevel({ name: data.montant, frais: data.frais, _id: _id })
    // ).then((res) => {
    //   // dispatch(addClassLevel(data));
    //   if (res.type === "classLevels/updateClassLevel/fulfilled") {
    //     window.location.href = "/admin/class/";
    //   }
    // });

    // navigate("/admin/subjects");
    // console.log(data);
  };
  return (
    <MainLayout>
      <form className="form__layout" onSubmit={handleSubmit}>
        <div className="form__layout--wrapper">
          <FormGroup label="Nom">
            <Input
              type="text"
              placeholder="Entrez le montant"
              name="montant"
              onChange={handleChange}
            />
          </FormGroup>

          <StripeCheckout
            name="Time Université"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            billingAddress
            shippingAddress
            description={"Le montant total est " + montant}
            amount={montant * 100}
            token={onToken}
            stripeKey={
              "pk_test_51J5TX7LLiFJrGSKS2YAiMz0QWVv2Ue1ijVZWAmSj3tpeiVl8n7qKdk21bVK9zMRUiLjLVXgMR2yvzQJwVrk9ysj500eu5Vy2Nm"
            }
          >
            {montant > 0 && (
              <MainButton
                text="Payer"
                isDisabled={false}
                type="submit"
                classname="main-button"
                loading={loading}
              />
            )}
          </StripeCheckout>
        </div>
      </form>
    </MainLayout>
  );
}

export default PaymentCreate;
