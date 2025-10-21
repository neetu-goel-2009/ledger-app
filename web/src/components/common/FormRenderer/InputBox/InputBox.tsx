import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import { 
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.mode === 'light' 
      ? alpha(theme.palette.text.primary, 0.9)
      : alpha(theme.palette.text.primary, 0.95),
    letterSpacing: '0.02em',
    transform: 'translate(14px, -8px) scale(0.85)',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
      fontWeight: 600
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    }
  },
  '& .MuiOutlinedInput-root': {
    transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'light' 
      ? alpha(theme.palette.common.white, 0.9)
      : alpha(theme.palette.common.black, 0.1),
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light'
        ? alpha(theme.palette.common.white, 1)
        : alpha(theme.palette.common.black, 0.15),
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.divider, 0.8),
  },
  '& .Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
    borderWidth: 2,
  },
}));

interface InputBoxProps {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  validation?: string;
  /** Optional tooltip/title to show when field is readonly */
  readOnlyTitle?: string;
  [key: string]: any;
}

const InputBox = (props: InputBoxProps) => {
  const { label, name, required = false, validation, InputProps, readOnly, readonly, readOnlyTitle, ...rest } = props;
  const isRequired = required || validation === 'required' || validation === 'email' || validation === 'password';
  const type = rest.type || "text";

  // Merge readonly flag into MUI InputProps.inputProps.readOnly so the native input is readonly
  const finalReadOnly = readOnly ?? readonly ?? InputProps?.inputProps?.readOnly ?? false;
  const mergedInputProps = {
    ...(InputProps || {}),
    inputProps: {
      ...(InputProps?.inputProps || {}),
      readOnly: finalReadOnly,
    },
  };

  const StyledInput = (field, form) => (<StyledTextField
                      {...field}
                      id={name}
                      label={
                        <Typography 
                          component="span" 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: (theme) => theme.palette.mode === 'light' 
                              ? alpha(theme.palette.text.primary, 0.9)
                              : alpha(theme.palette.text.primary, 0.95),
                            letterSpacing: '0.02em',
                            textTransform: 'capitalize',
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              bottom: -2,
                              height: 1,
                              backgroundColor: 'transparent',
                              transition: (theme) => theme.transitions.create('background-color'),
                            },
                            '.Mui-focused &::after': {
                              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                            }
                          }}
                        >
                          {label}
                          {isRequired && (
                            <Typography
                              component="span"
                              sx={{ 
                                ml: 0.5,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                lineHeight: 1,
                                color: (theme) => theme.palette.error.main,
                                opacity: 0.9,
                                transform: 'translateY(-2px)',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            >
                              *
                            </Typography>
                          )}
                        </Typography>
                      }
                      type={type}
                      error={form.errors[name] && form.touched[name]}
                      helperText={
                        form.errors[name] && form.touched[name] ? (
                          <ErrorMessage name={name} />
                        ) : null
                      }
                      variant="outlined"
                      fullWidth
                      size="medium"
                      sx={{
                        '& .MuiInputBase-input': {
                          padding: '12px 14px',
                          fontSize: '0.95rem',
                        },
                      }}
                      InputProps={{
                        ...(mergedInputProps || {}),
                        sx: {
                          ...(mergedInputProps?.sx || {}),
                          '&::placeholder': {
                            opacity: 0.7,
                          },
                        },
                      }}
                      {...rest}
                    />);
  return (
    <>
      {type === "hidden" ? (
        <Field id={name} name={name} {...rest} />
      ) : (
        <Field name={name}>
          {({ field, form }: any) => (
            <FormControl 
              fullWidth 
              margin="normal"
              sx={{
                mb: 2,
                '& .MuiFormLabel-root': {
                  top: -10,
                },
              }}
            >
              {finalReadOnly ? (
                <Tooltip title={readOnlyTitle ?? 'Read-only field'} arrow>
                  <span>
                    {StyledInput(field, form)}
                  </span>
                </Tooltip>
              ) : (
                <>
                  {StyledInput(field, form)}
                </>
              )}
            </FormControl>
          )}
        </Field>
      )}
    </>
  );
};

export default InputBox;
