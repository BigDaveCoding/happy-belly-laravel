import NavBar from "@/components/navbar";
import { useForm } from "@inertiajs/react";

export default function AddRecipe() {
    const { data, setData, post, processing, errors } = useForm({
        recipe_name: "",
        recipe_description: "",
        recipe_image: "",
        recipe_cooking_time: "",
        recipe_serves: "",
        ingredients: [{ name: "", food_group: "", allergen: false, quantity: "", unit: "" }],
        cooking_steps: [{ step: 1, instruction: "" }]
    });

    const addIngredient = () => {
        setData("ingredients", [...data.ingredients, { name: "", food_group: "", allergen: false, quantity: "", unit: "" }]);
    };

    const addStep = () => {
        setData("cooking_steps", [...data.cooking_steps, { step: data.cooking_steps.length + 1, instruction: "" }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/recipe/add");
    };

    return (
        <>
            <NavBar userId={1} />
            <h1 className="text-2xl font-bold mb-4">Add Recipe</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_2fr] gap-2 items-center mx-4">
                <label>Recipe Name:</label>
                <input type="text" value={data.recipe_name} onChange={(e) => setData("recipe_name", e.target.value)} required />
                {errors.recipe_name && <p className="text-red-500">{errors.recipe_name}</p>}

                <label>Description:</label>
                <textarea value={data.recipe_description} onChange={(e) => setData("recipe_description", e.target.value)} required />
                {errors.recipe_description && <p className="text-red-500">{errors.recipe_description}</p>}

                <label>Image URL:</label>
                <input type="text" value={data.recipe_image} onChange={(e) => setData("recipe_image", e.target.value)} />
                {errors.recipe_image && <p className="text-red-500">{errors.recipe_image}</p>}

                <label>Cooking Time (Minutes):</label>
                <input type="number" value={data.recipe_cooking_time} onChange={(e) => setData("recipe_cooking_time", e.target.value)} required />
                {errors.recipe_cooking_time && <p className="text-red-500">{errors.recipe_cooking_time}</p>}

                <label>Serves:</label>
                <input type="number" value={data.recipe_serves} onChange={(e) => setData("recipe_serves", e.target.value)} required />
                {errors.recipe_serves && <p className="text-red-500">{errors.recipe_serves}</p>}

                <h2 className="col-span-2 mt-4 text-lg font-bold">Ingredients</h2>
                {data.ingredients.map((ingredient, index) => (
                    <div key={index} className="col-span-2 flex gap-2">
                        <input type="text" placeholder="Ingredient Name" value={ingredient.name} onChange={(e) => {
                            const updated = [...data.ingredients];
                            updated[index].name = e.target.value;
                            setData("ingredients", updated);
                        }} required />

                        <input type="text" placeholder="Food Group" value={ingredient.food_group} onChange={(e) => {
                            const updated = [...data.ingredients];
                            updated[index].food_group = e.target.value;
                            setData("ingredients", updated);
                        }} />

                        <input type="number" placeholder="Quantity" value={ingredient.quantity} onChange={(e) => {
                            const updated = [...data.ingredients];
                            updated[index].quantity = e.target.value;
                            setData("ingredients", updated);
                        }} required />

                        <input type="text" placeholder="Unit (e.g., g, ml)" value={ingredient.unit} onChange={(e) => {
                            const updated = [...data.ingredients];
                            updated[index].unit = e.target.value;
                            setData("ingredients", updated);
                        }} required />

                        <label>
                            <input type="checkbox" checked={ingredient.allergen} onChange={(e) => {
                                const updated = [...data.ingredients];
                                updated[index].allergen = e.target.checked;
                                setData("ingredients", updated);
                            }} />
                            Allergen
                        </label>
                    </div>
                ))}
                <button type="button" onClick={addIngredient}>+ Add Ingredient</button>

                <h2 className="col-span-2 mt-4 text-lg font-bold">Cooking Steps</h2>
                {data.cooking_steps.map((step, index) => (
                    <div key={index} className="col-span-2">
                        <input type="text" placeholder={`Step ${step.step}`} value={step.instruction} onChange={(e) => {
                            const updated = [...data.cooking_steps];
                            updated[index].instruction = e.target.value;
                            setData("cooking_steps", updated);
                        }} required />
                    </div>
                ))}
                <button type="button" onClick={addStep}>+ Add Step</button>

                <div className="col-span-2 flex justify-end mt-4">
                    <button type="submit" disabled={processing}>
                        {processing ? "Saving..." : "Add Recipe"}
                    </button>
                </div>
            </form>
        </>
    );
}
