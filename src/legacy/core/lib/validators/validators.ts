import { z } from 'zod';
import { REGEX_ONLY_NUMBER } from '../regex/regex';

export function validators(): string {
  return 'validators';
}

export const schemaBuilder = z;

export const sb = ({ name, instance: _instance }: { name?: string; instance?: any } = { name: '', instance: null }) => {
  let instance = _instance;
  const passProps = () => ({ name, instance });

  return {
    string(_name?: string) {
      name = _name;
      instance = schemaBuilder.string();
      return { ...sb(passProps()) };
    },
    object(obj) {
      Object.keys(obj);
      instance = schemaBuilder.object(obj);
      return { ...sb(passProps()) };
    },
    required() {
      return instance.required();
    },

    min(min: number) {
      instance = instance.min(min);
      return { ...sb(passProps()) };
    },
    max(max: number) {
      instance = instance.max(max);
      return { ...sb(passProps()) };
    },
    length(length: number) {
      instance = instance.length(length);
      return { ...sb(passProps()) };
    },
    email() {
      instance = instance.email();
      return { ...sb(passProps()) };
    },
    regex(regex: RegExp) {
      instance = instance.regex(regex);
      return { ...sb(passProps()) };
    },

    e() {
      return instance;
    },
  };
};

export const emailValidation = sb().string('Email').min(3).max(50).email().e();
export const verificationCodeValidation = sb().string('Verification code').regex(REGEX_ONLY_NUMBER).length(6).e();
export const passwordValidation = sb().string('Password').min(8).e();
