const CategoryBar = ({
    categories,
    selectedCategory,
    onSelect
}) => {

    return (

        <div className="category-bar">

            <button
                className={
                    selectedCategory === ""
                    ? "active-category"
                    : ""
                }

                onClick={() => onSelect("")}
            >
                All
            </button>

            {
                categories.map((c) => (

                    <button
                        key={c.id}

                        className={
                            selectedCategory == c.id
                            ? "active-category"
                            : ""
                        }

                        onClick={() => onSelect(c.id)}
                    >
                        {c.category}
                    </button>

                ))
            }

        </div>
    );
}

export default CategoryBar;