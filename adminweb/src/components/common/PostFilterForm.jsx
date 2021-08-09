import React, { useState, useRef } from "react";
import InputField from "./InputField";
import PropTypes from "prop-types";

PostFilterForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFilterForm.defaltProps = {
  onSubmit: null,
};

function PostFilterForm(props) {
  const { onSubmit, value } = props;
  const [searchTerm, setSearchTerm] = useState(value);
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;

    setSearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValue = { searchTerm: value };
      onSubmit(formValue);
    }, 1000);
  }

  return (
    <div className="col col-third mb-16">
      <InputField
        id="search"
        name="search"
        isValid={true}
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Tìm kiếm"
        disabled={false}
      />
    </div>
  );
}
export default PostFilterForm;
