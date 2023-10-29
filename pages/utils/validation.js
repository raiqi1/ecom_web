export const validateEmail = (email) => {
  const regexSt =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexSt.test(String(email).toLowerCase());
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let questions = product.questions;
  const checks = [
    {
      msg: "Name, Description Brand added Successfully",
      type: "success",
    },
  ];
  if (images.length < 3) {
    checks.push({
      msg: `Please add 3 images (${3 - images.length}) remaining `,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images.length}Images added Successfully`,
      type: "success",
    });
  }
  if (!product.color.color) {
    checks.push({
      msg: `Please select color`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Color added Successfully`,
      type: "success",
    });
  }
  if (!product.color.image) {
    checks.push({
      msg: `Please select color image`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `Color image added Successfully`,
      type: "success",
    });
  }
  for (var i = 0; i < sizes.length; i++) {
    if (!sizes[i].size) {
      checks.push({
        msg: `Please select size`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `Size added Successfully`,
        type: "success",
      });
    }
    if (!sizes[i].qty) {
      checks.push({
        msg: `Please select quantity`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `Quantity added Successfully`,
        type: "success",
      });
    }
    if (!sizes[i].price) {
      checks.push({
        msg: `Please select price`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `Price added Successfully`,
        type: "success",
      });
    }
  }
  for (var i = 0; i < questions.length; i++) {
    if (!questions[i].question) {
      checks.push({
        msg: `Please select question`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `Question added Successfully`,
        type: "success",
      });
    }
    if (!questions[i].answer) {
      checks.push({
        msg: `Please select answer`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `Answer added Successfully`,
        type: "success",
      });
    }
  }
  for (var i = 0; i < details.length; i++) {
    if (!details[i].name) {
      checks.push({
        msg: `Please select detail`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `Detail added Successfully`,
        type: "success",
      });
    }
    if (!details[i].value) {
      checks.push({
        msg: `Please select value`,
        type: "error",
      });
    } else {
      checks.push({
        msg: `Value added Successfully`,
        type: "success",
      });
    }
  }
  var s_test = checks.find((c) => c.type === "error");
  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};
