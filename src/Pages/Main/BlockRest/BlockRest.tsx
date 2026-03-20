import "./BlockRest.scss";

interface type {
  name: string;
  description: string;
  img: string;
  where: string;
  long: number;
  cost: number;
}

export default function BlockRest({
  name,
  description,
  where,
  long,
  cost,
  img,
}: type) {
  return (
    <div className="block_rest main_color">
      <img className="main_img" src={img} alt="" />
      <h2>{name}</h2>
      <div>
        <img src="/Rests/place.svg" alt="" />
        <p>{where}</p>
        <p>{long} ночей</p>
        <p>{cost}$</p>

        {/* no need */}
        <p className="none">{description}$</p>
      </div>
    </div>
  );
}
