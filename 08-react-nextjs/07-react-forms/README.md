# React Forms - Complete Guide 📝

> **Master Form Handling in React**
> From controlled components to React Hook Form

**Interview Probability:** ⭐⭐⭐

---

## 📚 Contents

1. [Controlled Components](#controlled-components)
2. [Uncontrolled Components](#uncontrolled-components)
3. [Form Validation](#form-validation)
4. [React Hook Form](#react-hook-form)
5. [File Upload](#file-upload)

---

## Controlled Components

React controls form data via state.

### Simple Form

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">Login</button>
    </form>
  );
}
```

### Multiple Inputs

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'male',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />

      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>
        <input
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={handleChange}
        />
        I agree to terms
      </label>

      <button type="submit">Register</button>
    </form>
  );
}
```

---

## Uncontrolled Components

DOM controls form data via refs.

```jsx
function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" defaultValue="" />
      <input ref={passwordRef} type="password" defaultValue="" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Form Validation

### Manual Validation

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit form
    console.log({ email, password });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
```

---

## React Hook Form

```bash
npm install react-hook-form
```

### Basic Usage

```jsx
import { useForm } from 'react-hook-form';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email is invalid'
          }
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

### With Yup Validation

```bash
npm install yup @hookform/resolvers
```

```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().positive().integer().required('Age is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required()
}).required();

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="Name" />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input type="number" {...register('age')} placeholder="Age" />
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div>
        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

### Watch Values

```jsx
function Form() {
  const { register, watch } = useForm();

  const watchShowPassword = watch('showPassword', false);
  const watchAllFields = watch(); // Watch all fields

  return (
    <form>
      <input {...register('password')} type={watchShowPassword ? 'text' : 'password'} />

      <label>
        <input type="checkbox" {...register('showPassword')} />
        Show password
      </label>

      <pre>{JSON.stringify(watchAllFields, null, 2)}</pre>
    </form>
  );
}
```

---

## File Upload

### Single File

```jsx
function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    console.log('Uploaded:', await response.json());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />

      {file && (
        <div>
          <p>Selected: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      <button type="submit" disabled={!file}>
        Upload
      </button>
    </form>
  );
}
```

### Multiple Files

```jsx
function MultipleFileUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />

      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} - {(file.size / 1024).toFixed(2)} KB
          </li>
        ))}
      </ul>

      <button type="submit">Upload</button>
    </form>
  );
}
```

### With Preview

```jsx
function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <form>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div>
          <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />
        </div>
      )}

      <button type="submit">Upload</button>
    </form>
  );
}
```

---

## Interview Questions

### Q: Controlled vs Uncontrolled?

**Answer:**

**Controlled:**
- React controls form data
- Value stored in state
- onChange updates state

```jsx
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

**Uncontrolled:**
- DOM controls form data
- Access via ref

```jsx
<input ref={inputRef} defaultValue="" />
// Get value: inputRef.current.value
```

**Prefer controlled** for validation, formatting, etc.

---

### Q: Why use React Hook Form?

**Answer:**

**Benefits:**
- Less boilerplate
- Better performance (fewer re-renders)
- Built-in validation
- Easy integration with validation libraries (Yup, Zod)

**Comparison:**
```jsx
// Manual: 50+ lines of code
// React Hook Form: 10 lines

const { register, handleSubmit } = useForm();
<input {...register('email')} />
```

---

## 🎯 Quick Reference

```jsx
// Controlled
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled
const inputRef = useRef();
<input ref={inputRef} defaultValue="" />

// React Hook Form
const { register, handleSubmit } = useForm();
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
</form>

// File Upload
<input type="file" onChange={(e) => setFile(e.target.files[0])} />
```

---

**Next:** [React Testing](../08-react-testing/README.md)
**Previous:** [React Routing](../06-react-routing/README.md)

---

**Happy Learning! 🚀**
